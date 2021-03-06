variable "prefix" {
  description = "Prefix for all the resources"
  type        = string
}

variable "env" {
  description = "Which env the resource is created in"
  type        = string
}

variable "domain" {
  description = "Domain to use for SES"
  type        = string
}
