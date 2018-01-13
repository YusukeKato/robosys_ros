#!/usr/bin/env python
import rospy
from robosys_ros.msg import WallPosition

def recv_wallposi(data):
	rospy.loginfo(type(data))

if __name__ == '__main__':
	rospy.init_node('subscriber1')
	rospy.Subscriber("subscriber1", WallPosition, recv_wallposi)
	rospy.spin()
