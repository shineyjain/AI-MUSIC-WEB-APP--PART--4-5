Harry_potter_theme_song_1="";
Harry_potter_theme_song_2="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist =0;
Harry_potter_theme_song_1="";
Harry_potter_theme_song_2="";
function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    Harry_potter_theme_song_1= loadSound("Harry Potter 1.mp3");
    Harry_potter_theme_song_2= loadSound("Harry Potter 2.mp3");
}

function draw(){
    image(video,0,0,600,530);
    song1_status= Harry_potter_theme_song_1.isPlaying();
    song2_status= Harry_potter_theme_song_2.isPlaying();
    fill("#00ff00");
    stroke("#ff0000");

    song_name = Harry_potter_theme_song_1.isPlaying();
    console.log(song_name);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        Harry_potter_theme_song_1.stop();
        if(song2_status==false){ 
        Harry_potter_theme_song_2.play();
        document.getElementById("song_id").innerHTML = "Song Name: Harry Potter Song 1";
        }
    }
    if(scorerightWrist > 0.2){
        circle(rightWrist_x,leftWrist_y,20);
        Harry_potter_theme_song_2.stop();
        if(song1_status==false){ 
        Harry_potter_theme_song_1.play();
        document.getElementById("song_id").innerHTML = "Song Name: Harry Potter Song 2";
        }
    }
}
function modelLoaded(){
    console.log("poseNet Is Initialized");
}
function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}