n = int(input())

def fac(a):
	if a==0 or a==1:
		return a
	else:
		sums = 1
		for i in range(1,a+1):	
			sums = sums*i
		return sums	

lis = []
for i in range(n):
	a = [int(i) for i in input().split()]
	lis.append(a)


for j in range(n):
	b = lis[j]
	ans = fac(b[0])/(fac(b[1])*fac(b[0]-b[1]))
	print(int(ans))




https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js




# the corpse of anna fritz


