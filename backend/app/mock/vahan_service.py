import json
from pathlib import Path

# Project root
BASE_DIR = Path(__file__).resolve().parents[3]

APPLICATIONS_FILE = BASE_DIR / "data" / "applications.json"
USERS_FILE = BASE_DIR / "data" / "users.json"
VEHICLES_FILE = BASE_DIR / "data" / "vehicles.json"


def load_applications():
    with open(APPLICATIONS_FILE, "r") as file:
        return json.load(file)


def load_users():
    with open(USERS_FILE, "r") as file:
        return json.load(file)


def load_vehicles():
    with open(VEHICLES_FILE, "r") as file:
        return json.load(file)


def get_application(application_id: str):
    applications = load_applications()

    return next(
        (app for app in applications if app["id"] == application_id),
        None
    )


def get_vehicle(vehicle_id: str):
    vehicles = load_vehicles()

    return next(
        (vehicle for vehicle in vehicles if vehicle["vehicle_id"] == vehicle_id),
        None
    )


def get_user(user_id: str):
    users = load_users()

    return next(
        (user for user in users if user["id"] == user_id),
        None
    )