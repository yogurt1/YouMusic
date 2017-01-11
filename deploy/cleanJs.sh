#!/bin/bash

find app server |\
    grep -e '.js$' -e '.js.map$' |\
    grep -v -e '.json$' |\
    xargs rm
