function AABB (x1, y1, x2, y2)
{
    // Upper left
    this.x1 = (typeof x1 !== "undefined") ? x1 : 0;
    this.y1 = (typeof y1 !== "undefined") ? y1 : 0;
    
    // Lower right
    this.x2 = (typeof x2 !== "undefined") ? x2 : this.x1 + 1;
    this.y2 = (typeof y2 !== "undefined") ? y2 : this.y1 + 1;
    
    // NOTE: These are to be treated as raed-only!
    this.width  = this.x2 - this.x1;
    this.height = this.y2 - this.y1;
}

AABB.union = function (/* AABB, ... */)
{
    var x1 = Infinity;
    var y1 = Infinity;
    var x2 = -Infinity;
    var y2 = -Infinity;
    
    var aabb;
    
    for (var i = 0; i < arguments.length; ++i) {
        aabb = arguments[i];
        
        if (x1 > aabb.x1)
            x1 = aabb.x1;
        
        if (y1 > aabb.y1)
            y1 = aabb.y1;
        
        if (aabb.x2 > x2)
            x2 = aabb.x2;
        
        if (aabb.y2 > y2)
            y2 = aabb.y2;
    }
    
    return new AABB(x1, y1, x2, y2);
};

AABB.prototype.translate = function (x, y)
{
    this.x1 += x;
    this.y1 += y;
    this.x2 += x;
    this.y2 += y;
    
    return this;
};

AABB.prototype.scale = function (x, y)
{
    this.width  *= x;
    this.height *= x;
    this.x2      = this.x1 + this.width;
    this.y2      = this.y1 + this.height;
    
    return this;
};

AABB.prototype.copy = function ()
{
    return new AABB(this.x1, this.y1, this.x2, this.y2);
};

AABB.prototype.equalTo = function (other)
{
    if (this.x1 != other.x1 || this.y1 != other.y1)
        return false;
    
    if (this.x2 != other.x2 || this.y2 != other.y2)
        return false;
    
    return true;
};

AABB.prototype.intersects = function (other)
{
    if (this.x1 > other.x2 || other.x1 > this.x2)
        return false;
    
    if (this.y1 > other.y2 || other.y1 > this.y2)
        return false;
    
    return true;
};

AABB.prototype.contains = function (other)
{
    return (
        other.x1 >= this.x1 && other.y1 >= this.y1
    &&  this.x2 >= other.x2 && this.y2 >= other.y2
    );
};

AABB.prototype.quadrantFor = function (other)
{
    /*  Quadrants are:
        
        0 1
        2 3
    */
    
    var quadrant  = 0;
    
    if (other.x1 >= (this.x1 + (this.width * 0.5)))
        quadrant += 1;
    
    if (other.y1 >= (this.y1 + (this.width * 0.5)))
        quadrant += 2;
    
    return quadrant;
};
