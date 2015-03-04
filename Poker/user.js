'use strict';

var User = function() {

	this.rect = {left:0, top:0, width:0, height:0};
	this.coinRect = {left:0, top:0, width:0, height:0};
	this.coinTextRect = {left:0, top:0};
	this.param = {userName:"", userImage:"defaultUserImage", userCoin:"", isPlayer:"", userID:"", seatNum:-1};
	this.scale = 1;
	this.giveUp = false;
	this.animation;

	this.group;
	this.lbname;
	this.imagebody;
	this.lbcoin;
	this.containerplayer;
	this.containeruser;
	this.containerblank;
	this.containerwin;
	this.containerwinEffect;
	this.imageCoin = [];
	this.textCoin;
	this.winCards = [];
	this.winLightDot = [];
	this.winGroup;
}

User.prototype = {

	create:function(userName, userImage, userCoin, isPlayer) {

		this.param["userName"] = userName;
		this.param["userImage"] = userImage;
		this.param["userCoin"] = userCoin;
		this.param["isPlayer"] = isPlayer;

		this.containerplayer = game.add.image(this.rect.left + this.rect.width / 2, this.rect.top + this.rect.height / 2, "playerBK");
		this.containeruser = game.add.image(this.rect.left + this.rect.width / 2, this.rect.top + this.rect.height / 2, "userBK");
		this.containerblank = game.add.image(this.rect.left + this.rect.width / 2, this.rect.top + this.rect.height / 2, "blankBK");
		this.containerwin = game.add.image(this.rect.left + this.rect.width / 2, this.rect.top + this.rect.height / 2, "winBK");
		this.containerwinEffect = game.add.image(this.rect.left + this.rect.width / 2, this.rect.top + this.rect.height / 2, "winBKFrame");
		this.containerplayer.anchor.set(0.5);
		this.containeruser.anchor.set(0.5);
		this.containerblank.anchor.set(0.5);
		this.containerwin.anchor.set(0.5);
		this.containerwinEffect.anchor.set(0.5);
		this.containerplayer.scale.setTo(this.scale, this.scale);
		this.containeruser.scale.setTo(this.scale, this.scale);
		this.containerblank.scale.setTo(this.scale, this.scale);
		this.containerwin.scale.setTo(this.scale, this.scale);
		this.containerwinEffect.scale.setTo(this.scale, this.scale);
		this.winLightDot[0] = game.add.sprite(this.containerwin.x - this.containerwin.width * 0.41, this.containerwin.y + this.containerwin.height * 0.3, "winLight");
		this.winLightDot[0].scale.setTo(this.scale, this.scale);
		this.winLightDot[1] = game.add.sprite(this.containerwin.x + this.containerwin.width * 0.41, this.containerwin.y - this.containerwin.height * 0.3, "winLight");
		this.winLightDot[1].scale.setTo(this.scale, this.scale);
		this.winLightDot[0].anchor.set(0.5);
		this.winLightDot[1].anchor.set(0.5);
		this.winCards[0] = game.add.image(this.rect.left + this.rect.width * 0.05, this.rect.top + this.rect.height * 0.26, "cardBK");
		this.winCards[0].scale.setTo(this.scale * 0.75, this.scale * 0.75);
		this.winCards[1] = game.add.image(this.rect.left + this.rect.width * 0.4, this.rect.top + this.rect.height * 0.26, "cardBK");
		this.winCards[1].scale.setTo(this.scale * 0.75, this.scale * 0.75);

		this.winGroup = game.add.group();
		this.winGroup.add(this.containerwin);
		this.winGroup.add(this.containerwinEffect);
		this.winGroup.add(this.winLightDot[0]);
		this.winGroup.add(this.winLightDot[1]);
		this.winGroup.add(this.winCards[0]);
		this.winGroup.add(this.winCards[1]);
		this.containerwinEffect.alpha = 1;

		this.containerplayer.visible = false;
		this.containeruser.visible = false;
		this.containerblank.visible = true;
		this.winGroup.visible = false;
		if(this.param["userName"] && this.param["userName"] != "")
		{
			this.containerplayer.visible = false;
			this.containeruser.visible = true;
			this.containerblank.visible = false;
			this.winGroup.visible = false;
		}
		var style = { font: "20px Arial", fill: "#ffffff", wordWrap: false, wordWrapWidth: this.rect.width, align: "center" };
		if(isPlayer)
		{
			this.containerplayer.visible = true;
			this.containeruser.visible = false;
			this.containerblank.visible = false;
			this.winGroup.visible = false;
			style = { font: "20px Arial", fill: "#000000", wordWrap: false, wordWrapWidth: this.rect.width, align: "center" };
		}
		this.lbname = game.add.text(this.rect.left + this.rect.width / 2, this.rect.top + this.rect.height * 0.1, this.param["userName"], style);
		this.lbname.anchor.set(0.5);
		this.lbname.scale.setTo(this.scale, this.scale);
		this.imagebody = game.add.image(this.rect.left + this.rect.width * 0.05, this.rect.top + this.rect.height * 0.2, this.param["userImage"]);
		this.imagebody.scale.setTo(this.rect.width * 0.9 / this.imagebody.width, this.rect.height * 0.595 / this.imagebody.height);
		this.lbcoin = game.add.text(this.rect.left + this.rect.width / 2, this.rect.top + this.rect.height * 0.9, this.param["userCoin"], style);
		this.lbcoin.anchor.set(0.5);
		this.lbcoin.scale.setTo(this.scale, this.scale);

		style = { font: "20px Arial", fill: "#FFFF00"};
		this.textCoin = game.add.text(this.coinTextRect.left, this.coinTextRect.top, "", style);
		this.textCoin.scale.setTo(this.scale, this.scale);
		if(this.coinTextRect.left < this.coinRect.left)
		{
			this.textCoin.x = this.coinRect.left - this.textCoin.width - this.coinRect.width * 0.5;
		}
		this.textCoin.visible = false;
	},

	setRect:function(x, y, width, height) {

		this.rect = {left:x, top:y, width:width, height:height};
	},

	setCoinRect:function(x, y, width, height) {

		this.coinRect = {left:x, top:y, width:width, height:height};
	},

	setCoinTextPos:function(x, y) {

		this.coinTextRect = {left:x, top:y};
	},

	setParam:function(userName, userImage, userCoin, isPlayer)
	{
		if(userName)
		{
			this.param["userName"] = userName;
		}
		if(userImage)
		{
			this.param["userImage"] = userImage;
		}
		if(userCoin)
		{
			this.param["userCoin"] = userCoin;
		}
		if(isPlayer)
		{
			this.param["isPlayer"] = isPlayer;
		}

		this.containerplayer.visible = false;
		this.containeruser.visible = false;
		this.containerblank.visible = true;
		this.winGroup.visible = false;
		if(this.param["userName"] && this.param["userName"] != "")
		{
			this.containerplayer.visible = false;
			this.containeruser.visible = true;
			this.containerblank.visible = false;
			this.winGroup.visible = false;
		}
		var style = { font: "20px Arial", fill: "#ffffff", wordWrap: false, wordWrapWidth: this.rect.width, align: "center" };
		if(this.param["isPlayer"])
		{
			this.containerplayer.visible = true;
			this.containeruser.visible = false;
			this.containerblank.visible = false;
			this.winGroup.visible = false;
			style = { font: "20px Arial", fill: "#000000", wordWrap: false, wordWrapWidth: this.rect.width, align: "center" };
		}
		this.lbname.setText(this.param["userName"]);
		this.lbname.setStyle(style);
		//this.lbname.width = this.rect.width * 0.8;
		//this.lbname.height = this.rect.height * 0.2;
		this.lbname.scale.setTo(this.scale, this.scale);
		this.imagebody.scale.setTo(1, 1);
		this.imagebody.loadTexture(this.param["userImage"], this.imagebody.frame);
		this.imagebody.scale.setTo(this.rect.width * 0.9 / this.imagebody.width, this.rect.height * 0.595 / this.imagebody.height);
		this.lbcoin.setText(this.param["userCoin"]);
		this.lbcoin.setStyle(style);
	},

	setUseCoin:function(usedCoin)
	{
		this.textCoin.setText(usedCoin);
		if(this.coinTextRect.left < this.coinRect.left)
		{
			this.textCoin.x = this.coinRect.left - this.textCoin.width - this.coinRect.width * 0.5;
		}
		if(usedCoin != "")
		{
			this.textCoin.visible = true;
			var coin = game.add.image(this.rect.left + this.rect.width / 2, this.rect.top + this.rect.height / 2, "chip01");
			coin.anchor.set(0.5);
			coin.width = this.coinRect.width;
			coin.height = this.coinRect.height;
			this.imageCoin.push(coin);
			this.animation.showAddChip(coin, this.coinRect.left, this.coinRect.top - this.imageCoin.length * coin.height * 0.1111);
		}
		else
		{
			this.textCoin.visible = false;
			for(var i = 0; i < this.imageCoin.length; i++)
			{
				this.imageCoin[i].destroy();
			}
			this.imageCoin = [];
		}
	},

	setScale:function(scale)
	{
		this.scale = scale;
	},

	setAnimation:function(animation)
	{
		this.animation = animation;
	},

	setGroup:function(group)
	{
		this.group = group;
		this.group.add(this.containerplayer);
		this.group.add(this.containeruser);
		this.group.add(this.containerblank);
		this.group.add(this.winGroup);
		this.group.add(this.lbname);
		this.group.add(this.imagebody);
		this.group.add(this.lbcoin);
		for(var i = 0; i < this.imageCoin.length; i++)
		{
			this.group.add(this.imageCoin[i]);
		}
		this.group.add(this.textCoin);
	},

	setGiveUp:function(bGiveUp)
	{
		var alpha = 1;
		this.giveUp = bGiveUp;

		if(bGiveUp)
		{
			alpha = 0.5;
		}

		if(this.group)
		{
			this.containerplayer.alpha = alpha;
			this.containeruser.alpha = alpha;
			this.containerblank.alpha = alpha;
			this.winGroup.alpha = alpha;
			this.lbname.alpha = alpha;
			this.imagebody.alpha = alpha;
			this.lbcoin.alpha = alpha;
			this.textCoin.alpha = alpha;
			for(var i = 0; i < this.imageCoin.length; i++)
			{
				this.imageCoin[i].alpha = alpha;
			}
		}
	},

	setWinCard:function(key1, key2)
	{
		var that = this;
		var animationTime = 500;
		this.winGroup.visible = true;
		this.imagebody.visible = false;
		this.winCards[0].loadTexture(key1, this.winCards[0].frame);
		this.winCards[1].loadTexture(key2, this.winCards[1].frame);
		this.winLightDot[0].y = this.containerwin.y + this.containerwin.height * 0.3;
		this.winLightDot[1].y = this.containerwin.y - this.containerwin.height * 0.3;
		this.containerwinEffect.scale.setTo(this.scale, this.scale);
		this.winLightDot[0].visible = true;
		this.winLightDot[1].visible = true;
		this.containerwinEffect.alpha = 1;
		var tween1 = game.add.tween(this.winLightDot[0]);
		tween1.to({ y:this.containerwin.y - this.containerwin.height * 0.3 }, animationTime, Phaser.Easing.Linear.None, true);
		tween1.onComplete.add(function() {
			that.winLightDot[0].visible = false;
		}, this);
		var tween2 = game.add.tween(this.winLightDot[1]);
		tween2.to({ y:this.containerwin.y + this.containerwin.height * 0.3 }, animationTime, Phaser.Easing.Linear.None, true);
		tween2.onComplete.add(function() {
			that.winLightDot[1].visible = false;
		}, this);
		var tween3 = game.add.tween(this.containerwinEffect.scale);
		tween3.to({ x: this.scale * 1.3, y: this.scale * 1.3 }, animationTime, Phaser.Easing.Linear.None, true);
		var tween4 = game.add.tween(this.containerwinEffect);
		tween4.to({ alpha: 0 }, animationTime, Phaser.Easing.Linear.None, true);

		var style = { font: "20px Arial", fill: "#ffffff", wordWrap: false, wordWrapWidth: this.rect.width, align: "center" };
		this.lbname.setStyle(style);
		this.lbcoin.setStyle(style);

	},

	reset:function()
	{
	    this.winGroup.visible = false;
	    this.setGiveUp(false);
	    this.imagebody.visible = true;
	    this.setUseCoin("");
	},

	clean:function() 
	{
		this.winGroup.visible = false;
		this.imagebody.visible = true;
		this.param["userName"] = "";
		this.param["userCoin"] = "";
		this.setParam("", "defaultUserImage", "");
		this.setGiveUp(false);
		this.setUseCoin("");
	}
}
