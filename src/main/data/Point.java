package data;


import javax.faces.context.FacesContext;
import javax.persistence.*;
import javax.servlet.http.HttpSession;
@Entity
@Table(name="points")
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;
    private double x;
    private double y;
    private double r;
    private boolean hit;
    private String session;

    public boolean isHit() {
        return hit;
    }

    public void setHit(boolean hit) {
        this.hit = hit;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public Point() {
    }

    public Point(double x, double y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit=areaCheck();
        this.session = getSessionID();
    }
    private boolean areaCheck(){
        boolean circle = (x<=0 && y>=0) && r>=Math.sqrt(x*x+y*y);
        boolean triangle = (x<=0 && y<=0) && x*(-2)-r<=y;
        boolean rectangle = (x>=0 && y<=0) && (x<=r/2 && y>=(-1)*r );
        return circle || triangle || rectangle;
    }
    private String getSessionID(){
        FacesContext fCtx = FacesContext.getCurrentInstance();
        HttpSession session = (HttpSession) fCtx.getExternalContext().getSession(false);
        return session.getId();
    }
}
