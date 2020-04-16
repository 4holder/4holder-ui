variable "credentials_file" {}
variable "gcloud_project_id" {}
variable "gcloud_region" {}

variable "subdomain" {}
variable "dns_name" {}

variable "zone_name" {}
variable "load_balancer_ip" {}

provider "google" {
  credentials = file(var.credentials_file)
  project     = var.gcloud_project_id
  region      = var.gcloud_region
}

resource "google_dns_record_set" "for_holder_ui_a_record" {
  name = "${var.subdomain}${var.dns_name}"
  type = "A"
  ttl  = 300

  managed_zone = var.zone_name

  rrdatas = [var.load_balancer_ip]
}
