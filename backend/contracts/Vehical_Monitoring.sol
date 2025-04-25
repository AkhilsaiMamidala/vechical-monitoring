// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MachineRegistry {
    struct Machine {
        string machineId;
        string machineName;
        string purchaseDate;
        string manufacturer;
    }

    struct ServiceRequest {
        string machineId;
        string problem;
    }

    mapping(address => Machine) public machines;
    mapping(address => ServiceRequest[]) public serviceRequests;

    event MachineRegistered(string machineId, string machineName, string purchaseDate, string manufacturer);
    event ServiceRequested(string machineId, string problem);

    function registerMachine(string memory _machineId, string memory _machineName, string memory _purchaseDate, string memory _manufacturer) public {
        machines[msg.sender] = Machine(_machineId, _machineName, _purchaseDate, _manufacturer);
        emit MachineRegistered(_machineId, _machineName, _purchaseDate, _manufacturer);
    }

    function requestService(string memory _machineId, string memory _problem) public {
        serviceRequests[msg.sender].push(ServiceRequest(_machineId, _problem));
        emit ServiceRequested(_machineId, _problem);
    }
}
