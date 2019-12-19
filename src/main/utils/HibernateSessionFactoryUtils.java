package utils;

import org.hibernate.SessionFactory;




import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;


public class HibernateSessionFactoryUtils {
    private static SessionFactory sessionFactory;

    private static EntityManager em;
    static {
        EntityManagerFactory factory = Persistence.createEntityManagerFactory("hibernate-unit");
        em = factory.createEntityManager();
    }

/*
    static {
        if (sessionFactory == null) {
            try {
                Configuration configuration= new Configuration().configure().setProperty("hibernate.connection.password","psvita2013");
                configuration.addAnnotatedClass(Point.class);
                StandardServiceRegistryBuilder builder = new StandardServiceRegistryBuilder().applySettings(configuration.getProperties());
                sessionFactory = configuration.buildSessionFactory(builder.build());

            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
    }
    */

    public static SessionFactory getSessionFactory() {

        return sessionFactory;
    }
    public static EntityManager getEm(){
        return em;
    }
}