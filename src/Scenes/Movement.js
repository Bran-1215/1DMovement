class Movement extends Phaser.Scene {
    constructor() {
        super("1DMovementScene");
        this.my = {sprite: {}};

        this.bodyX = 300;
        this.bodyY = 500;

        this.AKey = null;
        this.DKey = null;
        this.SpaceKey = null;
        this.blastActive = false;

    }

    preload() {
        // Assets from Kenny Assets pack "Pixel Shmup"
        // https://kenney.nl/assets/pixel-shmup
        this.load.setPath("./assets/");
        this.load.image("ship", "ship.png");
        this.load.image("blast", "blast.png");
    }

    create() {
        let my = this.my;

        my.sprite.ship = this.add.sprite(this.bodyX, this.bodyY, "ship");
        my.sprite.ship.scale = 3;

        my.sprite.blast = this.add.sprite(this.bodyX, this.bodyY-30, "blast");
        my.sprite.blast.visible = false;

        this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.SpaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        let my = this.my;

        if(this.DKey.isDown) {
            if(my.sprite.ship.x < 750) {
                my.sprite.ship.x += 10;
            }
            
        }

        if(this.AKey.isDown) {
            if(my.sprite.ship.x > 50) {
                my.sprite.ship.x -= 10;
            }
        }

        if(Phaser.Input.Keyboard.JustDown(this.SpaceKey)) {
            if (!this.blastActive) {
                my.sprite.blast.x = my.sprite.ship.x;
            }
            my.sprite.blast.visible = true;
            this.blastActive = true;
        }

        if (this.blastActive) {
            if (my.sprite.blast.y <= 0) {
                this.blastActive = false;
                my.sprite.blast.visible = false;
                my.sprite.blast.y = this.bodyY-30;
            }
            my.sprite.blast.y -= 10;
        }
    }
}