#!/bin/bash

start_server () {
  npx next start -p 3005
}
stop_server () {
  kill -9 $(lsof -i TCP:3005 | grep LISTEN | awk '{print $2}')
}
test () {
  jest --verbose || stop_server
}

start_server & test & stop_server



