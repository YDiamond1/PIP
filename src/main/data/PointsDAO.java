package data;

import org.hibernate.Session;
import org.hibernate.Transaction;
import utils.HibernateSessionFactoryUtils;


import javax.faces.context.FacesContext;

import javax.servlet.http.HttpSession;
import java.util.List;
import org.hibernate.query.Query;
public class PointsDAO {
    public PointsDAO() {
    }

    private List<Point> points;
    public List<Point> getPoints() {
        return points;
    }

    public void setPoints(List<Point> points) {
        this.points = points;
    }
    public void addPoint(Point point){
        Session session=HibernateSessionFactoryUtils.getSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();
        session.save(point);
        transaction.commit();
        session.close();
    }
    private void updatePoints(){
        FacesContext fCtx = FacesContext.getCurrentInstance();
        HttpSession session = (HttpSession) fCtx.getExternalContext().getSession(false);
        String sessionID = session.getId();

        Query query=HibernateSessionFactoryUtils.getSessionFactory().openSession().createQuery("select p from Point p WHERE p.sessionID = :id");
        query.setParameter("id",sessionID );
        points=query.list();

    }
}
