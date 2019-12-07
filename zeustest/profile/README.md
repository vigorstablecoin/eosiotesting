# zeustest - example contract and tests with zeus

## Install the Zeus SDK
You need to install my version of the zeus-cmd from this repository:
https://github.com/prcolaco/zeus-cmd

## Deploy locally the zeustest box
```bash
$ zeus deploy box --type local
```

## Run a local EOSIO node and the zeus-test sample & tests
```bash
$ zeus unbox zeustest
$ cd zeustest
$ zeus test
```
