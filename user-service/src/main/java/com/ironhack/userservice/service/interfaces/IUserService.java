package com.ironhack.userservice.service.interfaces;

import com.ironhack.userservice.controller.dtos.UserDTO;

public interface IUserService {
    UserDTO findByUsername(String username);
}
