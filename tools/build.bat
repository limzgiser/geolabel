@chcp 65001
@rem 作者：leo
@echo off & setlocal enabledelayedexpansion
pushd
cd %~dp0\..\
set appname=geolabel
if not defined appname echo please set appname & goto :end
echo 启动angular编译

set a=%time%

call ng build --prod --aot --base-href /%appname%/
copy "change.md" dist\
if exist ..\public\%appname% xcopy /s /y dist ..\public\%appname%\

REM echo 修改配置文件
REM call node tools\build-config.js
echo 生成布署包
call node tools\pack.js

set b=%time%

echo 耗时: %b% - %a%

echo 打包压缩成功

