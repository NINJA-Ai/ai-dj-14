song = "";
scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristY = 0;
rightWristX = 0;

leftWristY = 0;
leftWristX = 0;

function preload()
    {
      song = loadSound("music.mp3");
    }

    function setup()
    {
            canvas = createCanvas(600,500);
            canvas.center();
            video = createCapture(VIDEO);
            video.hide();
            poseNet = ml5.poseNet(video, modelLoaded);
            poseNet.on('pose', gotPoses); 
        }
function modelLoaded()
{
    console.log('PoseNet model is Loaded');
}
function gotPoses(results)
{

    if(results.length > 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        righttWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
    }

}


function draw()
{
    image(video,0,0,460,460);

    fill("#FF0000");
	stroke("#FF0000");

    if(scoreRightWrist > 0.2)
	{ 
		circle(rightWristX,rightWristY,20);

		if(rightWristY >0 && rightWristY <= 100)
		{
			document.getElementById("speed").innerHTML = "Speed = 0.5x";		
			song.rate(0.5);
		}
        else if(rightWristY >100 && rightWristY <= 200)
		{
			document.getElementById("speed").innerHTML = "Speed = 1x";		
			song.rate(1);
		}
		else if(rightWristY >200 && rightWristY <= 300)
		{
			document.getElementById("speed").innerHTML = "Speed = 1.5x";		
			song.rate(1.5);
		}
    }
    else if(rightWristY >300 && rightWristY <= 400)
    {
        document.getElementById("speed").innerHTML = "Speed = 2x";		
        song.rate(2);
    }
    else if(rightWristY >400)
    {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";		
        song.rate(2.5);
    }
}
{


    if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);
		InNumberleftWristY = Number(leftWristY);
		new_leftWristY = floor(InNumberleftWristY);
		leftWristY_divide_1000 = new_leftWristY/500;
		document.getElementById("volume").innerHTML = "Volume = " + volume;	
		song.setVolume(volume)
	}

}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
