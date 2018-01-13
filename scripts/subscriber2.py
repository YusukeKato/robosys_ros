#!/usr/bin/env python
import rospy
from robosys_ros.msg import WallPosition

def recv_wallposi(data):
	rospy.loginfo(type(data))

if __name__ == '__main__':
	rospy.init_node('subscriber2')
	rospy.Subscriber("subscriber2", WallPosition, recv_wallposi)
	rospy.spin()
