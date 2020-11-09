output "identity_token" {
  value = aws_ses_domain_identity.domain.verification_token
}

output "dkim_tokens" {
  value = jsonencode(aws_ses_domain_dkim.domain.dkim_tokens)
}

output "queue_url" {
  value = aws_sqs_queue.queue.id
}
