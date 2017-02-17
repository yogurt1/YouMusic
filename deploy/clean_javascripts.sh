#!/bin/bash

find app server |\
    grep -e '.js$' -e '.js.map$' |\
    grep -v -e '.json$' -e 'vendor.js$' |\
    while read line
    do
        rm $line
    done

