package classes;

public class Point {
    private double x;
    private double y;
    private double r;
    private boolean hit;

    public Point(double x, double y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
        hit = checkArea(x,y,r);
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public boolean isHit() {
        return hit;
    }
    private boolean checkArea(double x, double y, double r){
        boolean partOFcircle = ((x<=0 && y>=0) && (x*x + y*y<=r*r))  ? true : false;
        boolean triangle = ((x>=0 && y>=0) && ((-2*x) + r <=y)) ? true : false;
        boolean rectangle = ((x<=0 && y<=0) && ( x>=(-1*r) && y>=(-1)*r)) ? true : false;
        return partOFcircle || triangle || rectangle;
    }
}
