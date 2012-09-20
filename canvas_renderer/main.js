var QUAD_ZOOM_LEVEL = 10;

$(function ()
{
    var treeManager  = new QuadtreeManager();
    var treeRenderer = new CanvasRenderer(treeManager);
    
    var lastX, lastY;
    var x, y;
    var drawingEnabled = false;
    
    document.body.onmousedown = function ()
    {
        drawingEnabled = true;
    };
    
    document.body.onmousemove = function (event)
    {
        if (!drawingEnabled)
            return;
        
        x = Math.floor(event.clientX / QUAD_ZOOM_LEVEL);
        y = Math.floor(event.clientY / QUAD_ZOOM_LEVEL);
        
        if (lastX != x || lastY != y) {
            treeManager.insert( new AABB(x, y) );
            treeRenderer.draw();
            
            lastX = x;
            lastY = y;
        }
    };
    
    document.body.onmouseup = function ()
    {
        drawingEnabled = false;
    };
});
