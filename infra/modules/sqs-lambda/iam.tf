data "aws_iam_policy_document" "lambda_service_trust_policy" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

data "aws_iam_policy_document" "lambda" {
  statement {
    effect = "Allow"

    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]

    resources = ["arn:aws:logs:*:*:*"]
  }
  statement {
    effect = "Allow"

    actions = [
      "sqs:ReceiveMessage",
      "sqs:DeleteMessage",
      "sqs:GetQueueAttributes"
    ]

    resources = [aws_sqs_queue.queue.arn]
  }
  statement {
    effect = "Allow"

    actions = [
      "ssm:GetParameter",
      "ssm:DescribeParameters"
    ]

    resources = ["arn:aws:ssm:${local.region}:${local.account_id}:parameter/*"]
  }
}

resource "aws_iam_policy" "lambda" {
  name        = "${var.prefix}-${var.env}-hook"
  description = "Enumerates allowed actions for the Lambda."
  policy      = data.aws_iam_policy_document.lambda.json
}

resource "aws_iam_role_policy_attachment" "lambda" {
  role       = aws_iam_role.lambda.name
  policy_arn = aws_iam_policy.lambda.arn
}

resource "aws_iam_role" "lambda" {
  name               = "${var.prefix}-${var.env}-hook"
  assume_role_policy = data.aws_iam_policy_document.lambda_service_trust_policy.json
}
