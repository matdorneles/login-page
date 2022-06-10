import prismaClient from "../prisma/index";
import { hash } from "bcryptjs";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    //verificar se preencheu um email
    if(!email) {
      throw new Error("E-mail não informado");
    }

    //verificar se email já está cadastrado
    const emailAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if(emailAlreadyExists) {
      throw new Error("E-mail já cadastrado!!")
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }
}

export { CreateUserService };