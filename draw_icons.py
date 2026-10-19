from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
root=Path(__file__).parent
font='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
for size,name in [(512,'icon-512.png'),(192,'icon-192.png'),(180,'apple-touch-icon.png')]:
    s=4; W=size*s
    im=Image.new('RGB',(W,W),(16,16,27))
    d=ImageDraw.Draw(im)
    for y in range(W):
        t=y/W
        d.line([(0,y),(W,y)],fill=(int(21+17*t),int(18+7*t),int(39+21*t)))
    # Soft geometric purple highlights.
    for i,(x,h) in enumerate([(0,130),(1,195),(2,146),(3,205),(4,106)]):
        unit=W/512
        gap=10*unit
        bw=46*unit
        total=5*bw+4*gap
        start=(W-total)/2
        bx=start+x*(bw+gap)
        mid=W*.48
        by=mid-h*unit/2
        r=13*unit
        d.rounded_rectangle((round(bx),round(by),round(bx+bw),round(by+h*unit)),radius=round(r),fill=(176,145,255) if i%2==1 else (132,109,230))
    d.ellipse((W*.73,W*.75,W*.78,W*.8),fill=(223,205,255))
    im.resize((size,size),Image.Resampling.LANCZOS).save(root/name,optimize=True)
