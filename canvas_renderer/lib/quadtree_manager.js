function QuadtreeManager ()
{
    this.root = null;
}

QuadtreeManager.prototype.insert = function (aabb)
{
    var subtree  = new Quadtree();
    subtree.aabb = aabb.copy();
    
    if (!this.root) {
        this.root = subtree;
    }
    else {
        var lastRoot = this.root.add(subtree);
        
        if (lastRoot.aabb.width > this.root.aabb.width)
            this.root = lastRoot;
    }
};
