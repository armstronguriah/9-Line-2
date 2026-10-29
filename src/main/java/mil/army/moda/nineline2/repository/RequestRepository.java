
package mil.army.moda.nineline2.repository;

import mil.army.moda.nineline2.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {





}


