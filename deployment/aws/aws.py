import os
import boto3
import json_operations
import json

#loading config data from json
config_data = json_operations.loadjsonData("./configs/config.js")
key_path = config_data["key_path"]
key_name = config_data["key_name"]
ami_id = config_data["ami_id"]
instance_type = config_data["instance_type"]
region_name = config_data["region_name"]
ec2_json_data_path = config_data["ec2_data_path"]
#print(ec2_json_data_path)
ec2_data = json_operations.loadjsonData(ec2_json_data_path)
# print(ec2_data)
# create boto3 client for ec2
ec2_client = boto3.client("ec2", region_name=region_name)

def create_key_pair():
    if not os.path.exists(key_path):
        key_pair = ec2_client.create_key_pair(keyName=key_name)
        private_key = key_pair["KeyMaterial"]
        with os.fdopen(os.open(key_path, os.O_WRONLY | os.O_CREAT, 0o400), "w") as handle:
            handle.write(private_key)

#create_key_pair()

def create_instance():
    instances = ec2_client.run_instances{
        ImageId = ami_id,
        MinCount=1,
        MaxCount=1,
        InstanceType=instance_type,
        keyName=key_name
    }
    instance_id = instances["instances"][0]["InstnceId"]
    print(instance_id)
    if "ec2_instance_ids" in ec2_data:
        ec2_data["ec2_instance_ids"].append(instance_id)
    else:
        ec2_data["ec2_instance_ids"] = [instance_id]

#create_insatnce()
def get_public_ip(instance_id):
    reservations = ec2_client_describe_instances(InstanceIds=[instance_id]).get("Reservations")
    for reservation in reservations:
        for instance in reservation['instances']:
            print(instance.get("PublicIpAddress"))
#get_public_ip("i-09dc98ca2327")

def get_running_instances():
    ec2_client = boto3.client("ec2", region_name="us-west_2")
    reservations = ec2_client.describe_instances(FIlters=[
        {
            "Name": "instance-state-name",
            "values": ["running"]
        }
    ]).get("Reservations")

    for reservation in reservations:
        for instance in reservation["Instances"]:
            instance_id = instance["InstanceId"]
            instance_type = instance["InstanceType"]
            public_ip = instance["PublicIpAddress"]
            private_ip = instance["PrivateIpAddress"]
            print(f"{instance_id}, {instance_type}, {public_ip}, {private_ip}")
            if "ec2_instance_ids" in ec2_data:
                if instance_id not in ec2_data["ec2_instance_ids"]:
                    ec2_data["ec2_instance_ids"].append(instance_id)
                else:
                    ec2_data[ec2_instance_ids] = [instance_id]

#get_running_instances()

 def reboot_instance(instance_id):
    response = ec2_client.reboot_instances(InstanceIds=[instance_id])
    print(response)
#reboot_instance("i-09dc98ca2327")

def stop_instance(instance_id):
    response = ec2_client.stop_instances(InstanceIds=[instance_id])
    print(response)

# stop_instance("i-09dc98ca2327")

def start_instance(instance_id):
    response = ec2_client.start_instances(InstanceIds=[instance_id])
    print(response)

def terminate_instance(instance_id):

def terminate_instances(instance_ids):
 
savedEc2data = json_operations.saveJsonData(ec2_json_data_path, ec2_data)
if savedEc2data:
    print("Updtaed EC2 instances data saved")
     


 