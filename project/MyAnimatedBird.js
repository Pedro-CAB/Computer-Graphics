import { CGFobject } from "../lib/CGF.js";
import {MyBird} from "./MyBird.js";

export class MyAnimatedBird extends CGFobject{
    constructor(scene, textures) {
        super(scene);
		this.scene = scene;
        this.obj = new MyBird(scene, textures);
        this.animVal = 0;
        this.elapsedTimeSecs;

        //Movement
        this.moveSpeed = 0;
        this.rotationAngle = 0; //in radians 
        this.position = [0,0,0];
        this.maxSpeed = 1;
        this.accelerating = false;

        //Speed and Scaling
        this.scaleFactor = 1;
        this.speedFactor = 1;
    }

    update(timeSinceAppStart, scaleFactor, speedFactor){
        this.scaleFactor = scaleFactor;
        this.speedFactor = speedFactor;
        this.maxSpeed = 1 + this.speedFactor;

        this.elapsedTimeSecs = (timeSinceAppStart * this.speedFactor) % 1;
        if(this.elapsedTimeSecs == 0.0 || this.elapsedTimeSecs == 0.5 || this.elapsedTimeSecs == 1.0){
          this.animVal = 0.0;
        }
        else if (this.elapsedTimeSecs > 0.0 && this.elapsedTimeSecs < 0.5){
          this.animVal = this.elapsedTimeSecs;
        }
        else if (this.elapsedTimeSecs > 0.5 && this.elapsedTimeSecs < 1){
          this.animVal = 1 - this.elapsedTimeSecs;
        }

        //this.rotationAngle = this.normalize_angle(this.rotationAngle);

        console.log(this.rotationAngle * 180 / Math.PI);

        if(this.accelerating){
          this.accelerate();
        }

        console.log("HERE:" + this.position);
        console.log("HERE:" + this.rotationAngle);

        //this.normalize_position();
        //this.position[0] = this.position[0];//* this.moveSpeed;
        //this.position[1] = this.position[1]; //* this.moveSpeed;
        //this.position[2] = this.position[2]; //* this.moveSpeed;
        
        console.log("moveSpeed: " + this.moveSpeed);

        this.obj.update(timeSinceAppStart, this.speedFactor);
    }

    toggle_acceleration(v){
      this.accelerating = v;
    }

    display()
    {
        this.scene.pushMatrix();
        //console.log([this.position[0],this.position[2]]);
        this.scene.translate(this.position[0],this.animVal*2,this.position[2]);
        this.scene.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
        this.scene.rotate(this.rotationAngle,0,1,0);
        this.obj.display();
        this.scene.popMatrix();
    }

    normalize_angle(angle){
      while (angle >= Math.PI * 2){
        angle -= Math.PI * 2;
      }
      while (angle < 0){
        angle += Math.PI * 2;
      }
      return angle;
    }

    normalize_position(){

      var magnitude = Math.sqrt(this.position[0]*this.position[0] + this.position[1]*this.position[1] + this.position[2]*this.position[2]);
      if(magnitude != 0){
        this.position[0] = this.position[0]/magnitude;
        this.position[1] = this.position[1]/magnitude;
        this.position[2] = this.position[2]/magnitude;
      }
      console.log("Position vector:" + this.position);
    }

    turn(v){
      this.rotationAngle += v * this.speedFactor;
    }

    accelerate(){
      /**
      console.log("ACCELERATING");
      if(this.moveSpeed + v < this.maxSpeed && this.moveSpeed + v > -this.maxSpeed){
        this.moveSpeed += v * this.speedFactor;
      }
      */
      this.position[2] -= Math.sin(this.rotationAngle) * this.speedFactor; //z
      this.position[0] += Math.cos(this.rotationAngle) * this.speedFactor; //x
    }

    resetPos(){
      this.position = [0,0,0];
      this.rotationAngle = 0;
      this.moveSpeed = 0;
    }

    resetRotation(){ //For testing purposes only
      this.rotationAngle = 0;
    }

    slow(){
      if (this.moveSpeed > 0){
        this.moveSpeed -= 0.5 * this.speedFactor;
      }
      else if (this.moveSpeed < 0){
        this.moveSpeed += 0.5 * this.speedFactor;
      }
      if (this.rotationAngle >= Math.PI * 2){
        this.rotationAngle -= Math.PI*2;
      }
      else if (this.rotationAngle < 0){
        this.rotationAngle += Math.PI*2;
      }
    }
}