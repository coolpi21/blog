#!/bin/sh
cd /Users/qiuyuan/codeFolder/blog/logs
cp access.logs $(date +%Y-%m-%d).access.logs
echo "" > access.logs
