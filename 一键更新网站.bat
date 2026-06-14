@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo ╔══════════════════════════════════╗
echo ║     聚泓阁本帮菜 · 网站更新     ║
echo ╚══════════════════════════════════╝
echo.
echo 正在提交更新...
"C:\Program Files\Git\bin\git.exe" add -A
echo.
set /p msg="输入更新说明（直接回车默认"更新内容"）: "
if "%msg%"=="" set msg=更新内容
"C:\Program Files\Git\bin\git.exe" commit -m "%msg%"
echo.
echo 正在推送到 GitHub...
"C:\Program Files\Git\bin\git.exe" push
echo.
echo ✅ 更新完成！等 1-2 分钟后刷新网页即可看到最新内容。
echo    网址: https://zunzun3331.github.io/juhongge
echo.
pause
