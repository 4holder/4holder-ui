variable "gcloud_project_id" { default = "fin2you" }
variable "credentials_file" { default = "./credentials/account.json" }

variable "region" {}
variable "subdomain" {}
variable "external_ip" {}

provider "google" {
  credentials = file("./credentials/account.json")
  project     = var.gcloud_project_id
  region      = var.region
}

terraform {
  backend "gcs" {
    bucket      = "ui_production_terraform"
    prefix      = "ui_production.tfstate"
    credentials = "./credentials/account.json"
  }
}

module "for_holder_ui_dns" {
  source                    = "./dns"
  credentials_file          = var.credentials_file
  gcloud_project_id         = var.gcloud_project_id
  gcloud_region             = var.region

  dns_name                  = data.terraform_remote_state.infra_production_state.outputs.dns_zone
  load_balancer_ip          = var.external_ip
  subdomain                 = var.subdomain
  zone_name                 = data.terraform_remote_state.infra_production_state.outputs.zone_name
}