interface UserResquest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserResquest) {
    console.log(name);

    return { name: name };
  }
}
export { CreateUserService };
