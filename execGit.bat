REM create a new repository on the command line
echo "# AdventOfCode2021" >> README.md
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/CaptWhite/AdventOfCode2021.git
git push -u origin main


REM push an existing repository from the command line
REM git remote add origin https://github.com/CaptWhite/AdventOfCode2021.git
REM git branch -M main
REM git push -u origin main