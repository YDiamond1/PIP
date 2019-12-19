package data;


import utils.HibernateSessionFactoryUtils;
import javax.persistence.*;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpSession;
import java.util.List;

public class PointsDAO {
    public PointsDAO() {
    }
    private Query query;
    private List<Point> points;
    public List<Point> getPoints() {
        updatePoints();
        return points;
    }

    public void setPoints(List<Point> points) {
        this.points = points;
    }
    public void addPoint(Point point){
        EntityManager em=HibernateSessionFactoryUtils.getEm();
        em.getTransaction().begin();
        em.persist(point);
        em.getTransaction().commit();

    }
    private void updatePoints(){
        FacesContext fCtx = FacesContext.getCurrentInstance();
        HttpSession session = (HttpSession) fCtx.getExternalContext().getSession(false);
        String sessionID = session.getId();

        Query query=HibernateSessionFactoryUtils.getEm().createQuery("select p from Point p WHERE p.sessionID = :id");
        query.setParameter("id",sessionID );
        points=query.getResultList();

    }
}
