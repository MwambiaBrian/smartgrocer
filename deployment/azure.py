import base64
from azure.identity import DefaultAzureCredential
from azure.mgmt.compute import ComputeManagementClient
from azure.mgmt.compute.models import (
    HardwareProfile,
    NetworkProfile,
    OSProfile,
    StorageProfile,
    VirtualHardDisk,
    VirtualMachine,
    VirtualMachineIdentity,
    SshPublicKey,
)
from azure.mgmt.network import NetworkManagementClient
from azure.mgmt.network.models import (
    NetworkInterface,
    NetworkInterfaceIPConfiguration,
)
from azure.mgmt.resource import ResourceManagementClient
from azure.mgmt.resource.resources.models import DeploymentMode

# Azure subscription ID
subscription_id = "YOUR_SUBSCRIPTION_ID"

# Resource group information
resource_group_name = "smartmkts_Resource_group"
location = "westus2"

# Virtual machine information
vm_name = "smartmrkt"
vm_size = "Standard_D2s_v3"
admin_username = "devuser"
admin_password = "password"

# SSH public key
ssh_public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDyvMcy3l14uVabG+kpxqg6zAXS4BOTRB2jZ5dVsqxOd4xzG5Im0yXZdYWJydlKD28IGIzdzmbeVOM5F/RgXgrqOImwSJ2Ouwt4Sq+1maeHu9WgPCiMVFYB5z4yXLTcOWMhnMH0n+UL2qxQGKWRsxcoQfPhN0OR4xRNPsBp4xLO6w+ig6EuZI01fnLqhPyPiiDFrV/ZQRQvYh/Iq4iHTLw7BhDL3fTMm8qWZfznq/ppAeHLvUI88M8K1U1YtALd/ajXbb9hdBgVw1Wcf9X1YRUaYXfDyrRK0uyawpwOkwtEseHre45/ycLErcqgI1oUaXzF3RpD6Trk3eClFq27x4ghsU/6QxL5qTelWbSv7W3xtREwtNWEqFHLwMttwPJT6CXWIWxkOCx8kbDAo+rTVtHwRDofti0Zl0Lo/D60N0YTR8VfF8uV6uQDJKZhbKY1KnUohXDApGNgP1073XHl2CW3ueGNvHZLYfNEcb6ICXFXuoersoPdRzn+dYYQmYNfCQE= nels@kali"


# Network information
vnet_name = "smartmrkt-vnet"
subnet_name = "smartmrkts-testing-subnet"
public_ip_name = "smartmrkts-public-ip"
network_interface_name = "smartmrkts-network-interface"

# Docker installation script
docker_install_script = """#!/bin/bash
apt-get update
apt-get install -y docker.io
"""

# Authenticate using Azure CLI credentials
credential = DefaultAzureCredential()

# Create clients for resource group, network, and compute management
resource_client = ResourceManagementClient(credential, subscription_id)
network_client = NetworkManagementClient(credential, subscription_id)
compute_client = ComputeManagementClient(credential, subscription_id)

# Create a resource group
resource_client.resource_groups.create_or_update(
    resource_group_name, {"location": location}
)

# Create a virtual network
vnet_params = {
    "location": location,
    "address_space": {"address_prefixes": ["10.0.0.0/16"]},
}
vnet_result = network_client.virtual_networks.begin_create_or_update(
    resource_group_name, vnet_name, vnet_params
).result()

# Create a subnet
subnet_params = {"address_prefix": "10.0.0.0/24"}
subnet_result = network_client.subnets.begin_create_or_update(
    resource_group_name, vnet_name, subnet_name, subnet_params
).result()

# Create a public IP address
public_ip_params = {"sku": {"name": "Basic"}, "public_ip_allocation_method": "Dynamic"}
public_ip_result = network_client.public_ip_addresses.begin_create_or_update(
    resource_group_name, public_ip_name, public_ip_params
).result()

# Create a network interface
nic_params = {
    "location": location,
    "ip_configurations": [
        {
            "name": "smartmrktipconfig",
            "subnet": {"id": subnet_result.id},
            "public_ip_address": {"id": public_ip_result.id},
        }
    ],
}
nic_result = network_client.network_interfaces.begin_create_or_update(
    resource_group_name, network_interface_name, nic_params
).result()

# Create an OS profile
os_profile = OSProfile(
    computer_name=vm_name,
    admin_username=admin_username,
    linux_configuration={
        "disablePasswordAuthentication": True,
        "ssh": {
            "publicKeys": [
                {"path": f"/home/{admin_username}/.ssh/authorized_keys", "keyData": ssh_public_key}
            ]
        },
    },
    custom_data=base64.b64encode(docker_install_script.encode()).decode(),
)

# Create a hardware profile
hardware_profile = HardwareProfile(vm_size=vm_size)

# Create a storage profile
storage_profile = StorageProfile(
    image_reference={
        "publisher": "Canonical",
        "offer": "UbuntuServer",
        "sku": "20.04-LTS",
        "version": "latest",
    },
    os_disk=VirtualHardDisk(
        name=vm_name + "-disk",
        caching="ReadWrite",
        create_option="FromImage",
        disk_size_gb=30,  # Set the desired disk size
    ),
)

# Create a network profile
network_profile = NetworkProfile(
    network_interfaces=[{"id": nic_result.id}],
)

# Create the virtual machine
virtual_machine = VirtualMachine(
    location=location,
    os_profile=os_profile,
    hardware_profile=hardware_profile,
    storage_profile=storage_profile,
    network_profile=network_profile,
    identity=VirtualMachineIdentity(type="SystemAssigned"),  # Enable system-assigned managed identity
)
compute_client.virtual_machines.begin_create_or_update(
    resource_group_name, vm_name, virtual_machine
).result()

# Print success message
print("Virtual machine deployed successfully.")