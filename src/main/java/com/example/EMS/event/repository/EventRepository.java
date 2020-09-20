package com.example.EMS.event.repository;

import com.example.EMS.event.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;
@Repository
public interface EventRepository extends JpaRepository<Event,Integer> {
    Optional<Event> findByName(String name);

    boolean existsByName(String eventName);

    void deleteByName(String eventName);

    Collection<Object> findAllByName(String newName);

    @Query(
            value = "SELECT * FROM event WHERE raffle_winner_username = '' " +
                    "or raffle_winner_username is null",
            nativeQuery = true)
    Collection<Event> getNonRaffledEvents();


}

