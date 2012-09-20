function CanvasRenderer (treeManager)
{
    this.treeManager = treeManager;
    this.canvas      = null;
    this.context     = null;
    
    this.initCanvas();
}

CanvasRenderer.prototype.initCanvas = function ()
{
    // TODO: Have the canvas element be passed into the constructor.
    this.canvas        = document.getElementById("tree_display");
    this.canvas.width  = $("body").width();
    this.canvas.height = $("body").height();
    
    this.context       = this.canvas.getContext("2d");
};

CanvasRenderer.prototype.draw = function ()
{
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.drawSubtree(this.treeManager.root);
};

CanvasRenderer.prototype.drawSubtree = function (subtree)
{
    this.context.strokeRect(
        subtree.aabb.x1     * QUAD_ZOOM_LEVEL,
        subtree.aabb.y1     * QUAD_ZOOM_LEVEL,
        subtree.aabb.width  * QUAD_ZOOM_LEVEL,
        subtree.aabb.height * QUAD_ZOOM_LEVEL
    );
    
    if (subtree.children) {
        for (var i = 0; i < subtree.children.length; ++i) {
            this.drawSubtree(subtree.children[i]);
        }
    }
};
