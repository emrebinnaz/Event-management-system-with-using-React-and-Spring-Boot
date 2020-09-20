package com.example.EMS.security.service;

import com.example.EMS.common.MessageResponse;
import com.example.EMS.common.enums.MessageType;
import com.example.EMS.person.entity.Lecturer;
import com.example.EMS.person.entity.Organizator;
import com.example.EMS.person.entity.Participant;
import com.example.EMS.person.repository.LecturerRepository;
import com.example.EMS.person.repository.OrganizatorRepository;
import com.example.EMS.person.repository.ParticipantRepository;
import com.example.EMS.person.service.LecturerService;
import com.example.EMS.person.service.OrganizatorService;
import com.example.EMS.person.service.ParticipantService;
import com.example.EMS.security.Repository.AuthorityRepository;
import com.example.EMS.security.Repository.UserRepository;
import com.example.EMS.security.dto.UserDTO;
import com.example.EMS.security.entity.Authority;
import com.example.EMS.security.entity.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static com.example.EMS.common.enums.MessageType.ERROR;
import static com.example.EMS.common.enums.MessageType.SUCCESS;

@Service
@RequiredArgsConstructor
public class UserService {

    private final AuthorityRepository authorityRepository;
    private final UserRepository userRepository;
    private final OrganizatorService organizatorService;
    private final LecturerService lecturerService;
    private final ParticipantService participantService;

    public MessageResponse addUser(UserDTO userDTO,String userType) {

        Set<Authority> authorities = getAuthoritiesOf(userDTO);
        try{
            if(isAnyUserHasSameUsernameWith(userDTO)) {
                return new MessageResponse("Bu kullanıcı adına sahip " +
                        "başka bir kullanıcı sistemde kayıtlı.Lütfen " +
                        "başka bir kullanıcı adı seçin.",ERROR);
            }

            else if(isAnyUserHasSameTcKimlikNoWith(userDTO)){
                return new MessageResponse("Bu kimlik numarasına sahip " +
                        "başka bir kullanıcı sistemde kayıtlı.Bu kimlik" +
                        " numarasıyla kayıt yapamassınız",ERROR);
            }
            else if(isAnyUserHasSamePhoneWith(userDTO)) {
                return new MessageResponse("Bu telefon numarasına sahip " +
                        "başka bir kullanıcı sistemde kayıtlı.Bu telefon" +
                        " numarasıyla kayıt yapamassınız",ERROR);
            }
            else if(isAnyUserHasSameEmailWith(userDTO)) {
                return new MessageResponse("Bu mail adresine sahip " +
                        "başka bir kullanıcı sistemde kayıtlı.Bu mail" +
                        " adresiyle kayıt yapamassınız",ERROR);
            }
            addUserToRelatedTable(userDTO,userType);
            authorityRepository.saveAll(authorities);
            addUserToUsersTable(userDTO,authorities);
            return new MessageResponse( "Tebrikler sisteme kayıt oldunuz. " +
                    "Artık giriş yapabilirsiniz.",SUCCESS);
        }
        catch (Exception err){
            err.printStackTrace();
        }
        return new MessageResponse( "Eklerken bir hata oluştu",ERROR);

    }


    private boolean isAnyUserHasSameUsernameWith(UserDTO userDTO) {
        Users user = userRepository.findByUsername(userDTO.getUsername());
        return user != null;
    }

    private boolean isAnyUserHasSameTcKimlikNoWith(UserDTO userDTO) {
        Users user = userRepository.findByTcKimlikNo(userDTO.getTcKimlikNo());
        return user != null;
    }

    private boolean isAnyUserHasSamePhoneWith(UserDTO userDTO) {
        Optional<Users> optionalUsers = userRepository.findByPhone(userDTO.getPhone());
        return optionalUsers.isPresent();
    }

    private boolean isAnyUserHasSameEmailWith(UserDTO userDTO) {
        Optional<Users> optionalUsers = userRepository.findByEmail(userDTO.getEmail());
        System.out.println(optionalUsers.isPresent());
        return optionalUsers.isPresent();
    }

    private Set<Authority> getAuthoritiesOf(UserDTO userDTO) {
        return userDTO.getAuthorities()
                .stream()
                .map(authority -> new Authority(null, new HashSet<>(), authority))
                .collect(Collectors.toSet());

    }

    private void addUserToRelatedTable(UserDTO userDTO, String userType) {

        if(userType.equals("PARTICIPANT"))
            addUserToParticipantTable(userDTO);
        else if(userType.equals("ORGANIZATOR"))
            addUserToOrganizatorTable(userDTO);
        else if(userType.equals("LECTURER"))
            addUserToLecturerTable(userDTO);
    }

    private void addUserToOrganizatorTable(UserDTO userDTO) {
        Organizator newOrganizator = new Organizator(null,userDTO.getName(),
                userDTO.getSurname(),userDTO.getTcKimlikNo(),userDTO.getUsername(),
                userDTO.getPassword(),userDTO.getPhone(),userDTO.getEmail(),
                userDTO.getBirthDate(),false,null);
        organizatorService.save(newOrganizator);
    }

    private void addUserToParticipantTable(UserDTO userDTO) {
        Participant newParticipant = new Participant(null,userDTO.getName(),
                userDTO.getSurname(),userDTO.getTcKimlikNo(),userDTO.getUsername(),
                userDTO.getPassword(),userDTO.getPhone(),userDTO.getEmail(),
                userDTO.getBirthDate());
        participantService.save(newParticipant);
    }

    private void addUserToUsersTable(UserDTO userDTO,Set<Authority> authorities) {
        Users users = new Users(null,userDTO.getUsername(),
                userDTO.getPassword(),userDTO.getTcKimlikNo(),userDTO.getEmail(),userDTO.getPhone(),
                true,true,
                true,true,authorities);
        userRepository.save(users);
    }

    private void addUserToLecturerTable(UserDTO userDTO) {
        Lecturer newLecturer = new Lecturer(null,userDTO.getName(),
                userDTO.getSurname(),userDTO.getTcKimlikNo(),userDTO.getUsername(),
                userDTO.getPassword(),userDTO.getPhone(),userDTO.getEmail(),
                userDTO.getBirthDate(),null);
        lecturerService.save(newLecturer);
    }

}
