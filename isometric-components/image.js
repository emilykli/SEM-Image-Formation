class Image{
    constructor()
    {
        this.imageMatrix = []
        for(let i = 1; i <= 5; i++)
        {
            this.imageMatrix.push([0, 0, 0, 0, 0])
        }
    }

    showSelf()
    {
        for(let x = 0; x < 5; x++)
        {
            for(let y = 0; y < 4; y++)
            {
                stroke(30);
                strokeWeight(3);
                console.log(this.imageMatrix[x][y]);
                fill(this.imageMatrix[x][y] + 0);
                rect(x * 70 + 1050, y * 70 + 30, 70, 70);
            }
        }
        stroke(0);
        strokeWeight(1);
    }
}