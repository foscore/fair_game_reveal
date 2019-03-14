#!/bin/bash

# 构建镜像
echo -e "\nbuild fos/fair-game-reveal image..."
sudo docker build -t fos/fair_game_reveal .


# 运行容器
sudo docker rm -f fair_game_reveal > /dev/null
echo -e "\nstart fair_game_reveal container..."
sudo docker run -d \
                --restart=always \
                --net=host \
                --name=fair_game_reveal \
                -e "NODE_ENV=development" \
                -e "MONGO_HOST=localhost" \
                fos/fair_game_reveal > /dev/null

echo ""
