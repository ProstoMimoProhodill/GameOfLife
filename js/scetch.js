var windowWid = 800;
var windowHei = 800;
var indentionGlobal = 20;
var numAliveRandomPoint = 50; // from 100%

var colums = 0;
var rows = 0;

var point = [];
var start = false;

function setup(){
    createCanvas(windowWid, windowHei);

    colums = Math.floor((windowWid)/indentionGlobal)-1;
    rows = Math.floor(windowHei/indentionGlobal)-1;

    for(let i=1;i<=colums;i++){
        point[i] = []; 
        for(let j=1;j<=rows;j++){
            point[i][j] = {x: i, y: j, fill: 255, status: "dead", neighbor: 0};
        }
    }
}

function draw(){
    createGrid(indentionGlobal);
    for(let i=1;i<=colums;i++){
        for(let j=1;j<=rows;j++){
            point[i][j].neighbor = searchNeighbor(point[i][j]);
        }
    }

    if(start){
        for(let i=1;i<=colums;i++){
            for(let j=1;j<=rows;j++){
                let neighbor = point[i][j].neighbor;
                if(point[i][j].status=="alive"){
                    if((neighbor<2)||(neighbor>3)){
                        point[i][j].fill = 255;
                        point[i][j].status = "dead";
                    }
                }
                if(point[i][j].status=="dead"){
                    if(neighbor==3){
                        point[i][j].fill = 0;
                        point[i][j].status = "alive";
                    }
                }
            }
        }

    }
}

function createGrid(indention){
    for(let i=1;i<=colums;i++){
        for(let j=1;j<=rows;j++){
            (point[i][j].fill==255)?fill(200,200,200):fill(0,0,255);
            //(point[i][j].fill==255)?fill(240,240,240):fill(getRandomInt(0,255),getRandomInt(0,255),getRandomInt(0,255));            
            rect(i*indention,j*indention,i*indention + indention ,j*indention + indention);
        }
    }
}

function mouseClicked(){
    let x = Math.floor(mouseX/indentionGlobal);
    let y = Math.floor(mouseY/indentionGlobal);

    if((mouseX<windowWid)&&(mouseY<windowHei)){
        if(point[x][y].fill==255){
            point[x][y] = {x: x, y: y, fill: 0, status: "alive"};        
        }else{
            point[x][y] = {x: x, y: y, fill: 255, status: "dead"};        
        }
    }
}


function searchNeighbor(currentPoint){
    var neighbor = 0;
    let x = currentPoint.x;
    let y = currentPoint.y;
    let Xmax=0,Xmin=0,Ymax=0,Ymin=0;

    if(x==1){
        Xmin = 1;
        Xmax = 2;
    }else if(x==colums){
        Xmin = colums-1;
        Xmax = colums;
    } else {
        Xmin = x-1;
        Xmax = x+1;
    }

    if(y==1){
        Ymin = 1;
        Ymax = 2;
    }else if(y==rows){
        Ymin = rows-1;
        Ymax = rows;
    }else{
        Ymin = y-1;
        Ymax = y+1;
    }

    if((x!=1)&&(x!=colums)&&(y!=1)&&(y!=rows)){
        for(let i=x-1;i<=x+1;i++){
            for(let j=y-1;j<=y+1;j++){
                if((i!=x)||(j!=y)){
                    if(point[i][j].status=="alive"){
                        neighbor++;
                    }
                }
            }
        }
    }else{
        for(let i=Xmin;i<=Xmax;i++){
            for(let j=Ymin;j<=Ymax;j++){
                if((i!=x)||(j!=y)){
                    if(point[i][j].status=="alive"){
                        neighbor++;                                             
                    }
                }
            }
        }
    }
    return neighbor;
}

function setupPoint(){
    for(let k=1;k<=(Math.floor((colums*rows)*(numAliveRandomPoint/100)));k++){
        let p = point[getRandomInt(1, colums+1)][getRandomInt(1, rows+1)];
        p.status = "alive";
        p.fill = 0;
    }
}

function startDraw(){
    if(start == false){
        start = true; 
        document.getElementById("start").innerHTML="Stop";           
    }else{
        start = false;
        document.getElementById("start").innerHTML="Start";  
    }
}

function clearField(){
    for(let i=1;i<=colums;i++){
        for(let j=1;j<=rows;j++){
            point[i][j].status = "dead";
            point[i][j].fill = 255;
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}