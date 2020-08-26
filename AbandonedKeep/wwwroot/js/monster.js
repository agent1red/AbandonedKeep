class Monster
{

    constructor(config)
    {

        console.log(config);
        this.str = config.str;
        this.hp = config.hp;
        this.name = config.name;
        this.alive = true;


    }

    getMyName()
    {
        return this.name;
    }

    damage(str)
    {
        var attack = Math.floor(Math.random() * 100);
        if (attack > 50)
        {
            //hit
            var myDamage = Math.floor(Math.random() * str) + 1;
            this.hp -= myDamage;
            if (this.hp <1)
            {
                this.alive = false;
            }
            return { success: true, damage: myDamage, playerDamage:0 };

        } else
        {
            var playerDamage = Math.floor(Math.random() * this.str) + 1;
            return { success: false, damage: 0, playerDamage: playerDamage };
        }
    }
}
