node backend/index.js &
for i in 1 2 3 ; do
	npx typeorm query "insert into user (id,email,name,avatarUrl) values(1,'infra@flytxt.com','infrabot','nil')" > /dev/null 2>&1
	if [ $? ]; then
		sleep 5
	else
		echo "Bom ready to start"
        break
	fi
echo $i
done
#echo  'baby' $i
if [ "$i" = "3" ]; then
    echo Error
fi

