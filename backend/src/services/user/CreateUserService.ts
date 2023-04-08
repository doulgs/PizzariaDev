import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserResquest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserResquest) {
    //Verificar o email
    if (!email) {
      throw new Error("Email incorrect");
    }
    // Verificar se o Email já existe
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (userAlreadyExists) {
      throw new Error("Email already exists");
    }

    const passowrdHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passowrdHash,
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
