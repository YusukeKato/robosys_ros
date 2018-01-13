# robosys2017-2018 

- スマートフォンで対戦型できるホッケーゲームを作成しました。（2人用）

- ROSを介してリアルタイムの通信を行っています。


# Rules

- 画面をタッチすることで棒を動かせます。

- その棒で玉を跳ね返します。

- 玉の速度は時間とともに早くなります。

- 跳ね返せないと負けです。

## Requirements
- Ubuntu16.04
- ROS kinetic
- rosbridge_server
- smartphone *2
- local network


## Usage
以下のコマンドで導入
```
$ cd ~/catkin_ws/src/
$ git clone https://github.com/YusukeKato/robsys_ros.git
$ roslaunch rosbridge_server rosbridge_websocket.launch
$ roslaunch robosys_ros robosys_game.launch
$ cd ~/catkin_ws/src/robosys_ros/scripts
$ rosrun robosys_ros webserver.py
$ cd ~/catkin_ws/src/robosys_ros/scripts2
$ python -m SimpleHTTPServer 8080
```

スマートフォンでそれぞれのURLにアクセス

```
player1

http://<your PC ip address>:8000

player2

http://<your PC ip address>:8080
```
＊　ポートの違いに注意

## Youtube

https://youtu.be/ooVxHlUM3bM



## License


Copyright (C) 2018 Yusuke Kato, All rights reserved.


License : BSD



