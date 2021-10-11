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
            for(let y = 0; y < 3; y++)
            {
                stroke(255);
                strokeWeight(3);
                console.log(this.imageMatrix[x][y]);
                fill(this.imageMatrix[x][y] + 0);
                rect(x * 80 + 1000, y * 80 + 30, 80, 80);
            }
        }
    }
}