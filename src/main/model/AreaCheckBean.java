package model;

import data.Point;
import data.PointsDAO;



import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import java.io.Serializable;
import java.util.List;


@ManagedBean(name = "checker")
@SessionScoped
public class AreaCheckBean implements Serializable {

    private PointsDAO DAO = new PointsDAO();
    private List<Point> points;
    private double x;
    private double y;
    private double r;

    private double xCanvas;
    private double yCanvas;
    public void addPointC(){
        DAO.addPoint(new Point(xCanvas,yCanvas,r));
    }

    public double getxCanvas() {
        return xCanvas;
    }

    public void setxCanvas(double xCanvas) {
        this.xCanvas = xCanvas;
    }

    public double getyCanvas() {
        return yCanvas;
    }

    public void setyCanvas(double yCanvas) {
        this.yCanvas = yCanvas;
    }

    public void addPoint(){
        DAO.addPoint(new Point(x,y,r));
    }
    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public List<Point> getPoints() {
        return DAO.getPoints();
    }

    public void setPoints(List<Point> points) {
        this.points = points;
    }
}
