#import sys

#if len(sys.argv) != 2:
    #sys.stderr.write("usage: {} hostName".format(sys.argv[0]))
    #exit(-1) # or deal with this case in another way
#hostName_arg = sys.argv[1]

import sys
import os.path

my_name = sys.argv[1]

for n, a in enumerate(sys.argv):
    print('arg {} has value {} endOfArg'.format(n, a))
try:
    pathis = "directoryFiles/""" + str(my_name) + "/" + str(my_name) + ".txt"
    print(pathis)
    file_exists = os.path.exists(pathis)

    print(file_exists)

    with open(pathis, 'w') as f:
        f.write("Hello and welcome again something here " + str(my_name) + "!")
except FileNotFoundError:
    print("The 'docs' directory does not exist")
#print("Hello and welcome " + str(my_name) + "!")