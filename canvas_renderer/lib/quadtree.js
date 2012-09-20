function Quadtree (parent)
{
    this.parent   = null;
    this.children = null;
    this.quadrant = 3;
    this.aabb     = new AABB();
    
    if (typeof parent !== "undefined") {
        this.parent = parent;
    }
}

Quadtree.prototype.add = function (subtree)
{
    // This node
    if (this.aabb.equalTo(subtree.aabb)) {
        if (!this.parent)
            this.grow();
        
        subtree.parent                      = this.parent;
        this.parent.children[this.quadrant] = subtree;
        
        return this;
    }
    // Child node
    else if (this.aabb.contains(subtree.aabb)) {
        if (!this.children)
            this.subdivide();
        
        subtree.quadrant = this.aabb.quadrantFor(subtree.aabb);
        this.children[subtree.quadrant].add(subtree);
        
        return this;
    }
    // Out-of-bounds
    else {
        if (!this.parent)
            this.grow();
        
        return this.parent.add(subtree);
    }
};

Quadtree.prototype.grow = function ()
{
    var parent = new Quadtree();
    
    parent.children = [];
    parent.aabb     = this.aabb.copy().scale(2, 2);
    
    if (this.quadrant) {
        var tD = 0 - (this.aabb.x2 - this.aabb.x1);
        parent.aabb.translate(tD, tD);
        parent.quadrant = 0;
    }
    
    parent.children[this.quadrant] = this;
    parent.subdivide();
    
    this.parent = parent;
};

Quadtree.prototype.subdivide = function ()
{
    var tD = this.aabb.width >> 1;
    
    if (!this.children)
        this.children = [];
    
    for (var i = 0; i < 4; ++i) {
        if (!this.children[i]) {
            var child      = new Quadtree(this);
            child.quadrant = i;
            child.aabb     = this.aabb.copy().scale(0.5, 0.5);
            
            child.aabb.translate((i & 1) * tD, (i > 1) ? tD : 0);
            
            this.children[i] = child;
        }
    }
};

// Queries
Quadtree.prototype.subtreeWithin = function (aabb)
{
    // TODO: There's probably a more optimal way to write this.
    if (this.aabb.contains(aabb)) {
        if (this.children) {
            for (var i = 0; i < this.children.length; ++i) {
                if (this.children[i].aabb.contains(aabb)) {
                    return this.children[i].getParent(aabb);
                }
            }
        }
        
        return this;
    }
};
