package classes;

public class Point {
    private double x;
    private double y;
    private int r;
    private boolean hit;
    private boolean wrong;

    public Point(boolean wrong) {
        this.wrong = wrong;
    }

    public Point(double x, double y, int r) {
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
    private boolean checkArea(double x, double y, int r){
        boolean partOFcircle = ((x<=0 && y>=0) && (x*x + y*y<=r*r));
        boolean triangle = ((x>=0 && y>=0) && ((-2*x) >=y-r));
        boolean rectangle = ((x<=0 && y<=0) && ( x>=(-1*r) && y >= ((-1)*r)/2));
        return partOFcircle || triangle || rectangle;
    }
}
