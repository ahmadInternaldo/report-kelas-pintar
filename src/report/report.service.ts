import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { JwtAuthService } from 'src/utils/authentications/jwt/jwt.service';
import { Roles } from 'src/utils/entities/base.entity';
import { Chapter } from 'src/utils/entities/chapter.entity';
import { Report } from 'src/utils/entities/report.entity';
import { Subject } from 'src/utils/entities/subject.entity';
import { User } from 'src/utils/entities/user.entity';
import { FilterException } from 'src/utils/exceptions/filter.exception';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report)
    private readonly reportRepo: typeof Report,
    @InjectModel(User)
    private readonly userRepo: typeof User,
    private readonly jwt: JwtAuthService
  ) {}

  async allData(requestData: string, authorization: string): Promise<any> {
    try {
      //
      let checkToken = await this.jwt.verifyAsync(authorization);
      console.log(checkToken);
      let where: any = {
        grade: +requestData
      };
      let findUser = await this.userRepo.findOne({
        where: {
          id: checkToken.id
        }
      });
      if (findUser.tokenSession !== authorization) {
        throw new BadRequestException({
          messageDetail: 'Session expired, relogin again please'
        });
      }
      if (findUser.role === Roles.STUDENT) {
        if (+requestData !== findUser.grade) {
          throw new UnauthorizedException({
            messageDetail: 'you are not authorize'
          });
        }
      }
      if (!requestData) {
        delete where.grade;
      }
      const students = await this.reportRepo.findAll({
        where,
        attributes: ['id', 'userId', 'subjectId', 'chapterId', 'grade', 'score'],
        include: [
          { model: User, attributes: ['username'] },
          { model: Subject, attributes: ['subjectName'] },
          { model: Chapter, attributes: ['chapterName'] }
        ]
      });
      // get every student average

      let findUserAll = await this.userRepo.findAll({
        where
      });
      let output = [];
      //check report by chapter and userId
      for (let j of findUserAll) {
        if (j.role === Roles.TEACHER) {
          continue;
        }
        let user = {
          name: j.username,
          grade: j.grade,
          nilaiRataRata: 0,
          rataRataKelas: 0,
          status: '',
          rataRataMatematika: 0,
          rataRataBahasaIndonesia: 0,
          rataRataBahasaInggris: 0,
          rataRataSains: 0,
          topThree: [],
          rataRataTerendah: []
        };
        let sortUser = [];
        for (let i of students) {
          if (user.name === i.user.username) {
            let data = {
              subject: i.subject.subjectName,
              chapter: i.chapter.chapterName,
              score: i.score
            };
            switch (i.subject.subjectName) {
              case 'Math':
                user.rataRataMatematika += i.score;
                break;
              case 'Indonesian':
                user.rataRataBahasaIndonesia += i.score;
                break;
              case 'English':
                user.rataRataBahasaInggris += i.score;
                break;
              case 'Science':
                user.rataRataSains += i.score;
            }
            sortUser.push(data);
          }
        }
        user.rataRataMatematika /= 5;
        user.rataRataBahasaIndonesia /= 5;
        user.rataRataBahasaInggris /= 5;
        user.rataRataSains /= 5;
        user.nilaiRataRata = +(
          (user.rataRataMatematika + user.rataRataBahasaIndonesia + user.rataRataBahasaInggris + user.rataRataSains) /
          4
        ).toFixed(2);
        user['report'] = sortUser;
        output.push(user);
      }

      //check score average by grade
      let grades = {
        gradeOne: { score: 0, count: 0, topThree: [], underAverage: [] },
        gradeTwo: { score: 0, count: 0, topThree: [], underAverage: [] },
        gradeThree: { score: 0, count: 0, topThree: [], underAverage: [] },
        gradeFour: { score: 0, count: 0, topThree: [], underAverage: [] },
        gradeFive: { score: 0, count: 0, topThree: [], underAverage: [] },
        gradeSix: { score: 0, count: 0, topThree: [], underAverage: [] },
        gradeSeven: { score: 0, count: 0, topThree: [], underAverage: [] },
        gradeEight: { score: 0, count: 0, topThree: [], underAverage: [] },
        gradeNine: { score: 0, count: 0, topThree: [], underAverage: [] },
        gradeTen: { score: 0, count: 0, topThree: [], underAverage: [] },
        gradeEleven: { score: 0, count: 0, topThree: [], underAverage: [] },
        gradeTwelve: { score: 0, count: 0, topThree: [], underAverage: [] }
      };
      for (let average of output) {
        switch (average.grade) {
          case 1:
            grades.gradeOne.score += average.nilaiRataRata;
            grades.gradeOne.count++;
            break;
          case 2:
            grades.gradeTwo.score += average.nilaiRataRata;
            grades.gradeTwo.count++;
            break;
          case 3:
            grades.gradeThree.score += average.nilaiRataRata;
            grades.gradeThree.count++;
            break;
          case 4:
            grades.gradeFour.score += average.nilaiRataRata;
            grades.gradeFour.count++;
            break;
          case 5:
            grades.gradeFive.score += average.nilaiRataRata;
            grades.gradeFive.count++;
            break;
          case 6:
            grades.gradeSix.score += average.nilaiRataRata;
            grades.gradeSix.count++;
            break;
          case 7:
            grades.gradeSeven.score += average.nilaiRataRata;
            grades.gradeSeven.count++;
            break;
          case 8:
            grades.gradeEight.score += average.nilaiRataRata;
            grades.gradeEight.count++;
            break;
          case 9:
            grades.gradeNine.score += average.nilaiRataRata;
            grades.gradeNine.count++;
            break;
          case 10:
            grades.gradeTen.score += average.nilaiRataRata;
            grades.gradeTen.count++;
            break;
          case 11:
            grades.gradeEleven.score += average.nilaiRataRata;
            grades.gradeEleven.count++;
            break;
          case 12:
            grades.gradeTwelve.score += average.nilaiRataRata;
            grades.gradeTwelve.count++;
            break;
        }
      }
      grades.gradeOne.score /= grades.gradeOne.count;
      grades.gradeTwo.score /= grades.gradeTwo.count;
      grades.gradeThree.score /= grades.gradeThree.count;
      grades.gradeFour.score /= grades.gradeFour.count;
      grades.gradeFive.score /= grades.gradeFive.count;
      grades.gradeSix.score /= grades.gradeSix.count;
      grades.gradeSeven.score /= grades.gradeSeven.count;
      grades.gradeEight.score /= grades.gradeEight.count;
      grades.gradeNine.score /= grades.gradeNine.count;
      grades.gradeTen.score /= grades.gradeTen.count;
      grades.gradeEleven.score /= grades.gradeEleven.count;
      grades.gradeTwelve.score /= grades.gradeTwelve.count;

      for (let i = 0; i < output.length; i++) {
        switch (output[i].grade) {
          case 1:
            output[i]['rataRataKelas'] = +grades.gradeOne.score.toFixed(2);
            break;
          case 2:
            output[i]['rataRataKelas'] = +grades.gradeTwo.score.toFixed(2);
            break;
          case 3:
            output[i]['rataRataKelas'] = +grades.gradeThree.score.toFixed(2);
            break;
          case 4:
            output[i]['rataRataKelas'] = +grades.gradeFour.score.toFixed(2);
            break;
          case 5:
            output[i]['rataRataKelas'] = +grades.gradeFive.score.toFixed(2);
            break;
          case 6:
            output[i]['rataRataKelas'] = +grades.gradeSix.score.toFixed(2);
            break;
          case 7:
            output[i]['rataRataKelas'] = +grades.gradeSeven.score.toFixed(2);
            break;
          case 8:
            output[i]['rataRataKelas'] = +grades.gradeEight.score.toFixed(2);
            break;
          case 9:
            output[i]['rataRataKelas'] = +grades.gradeNine.score.toFixed(2);
            break;
          case 10:
            output[i]['rataRataKelas'] = +grades.gradeTen.score.toFixed(2);
            break;
          case 11:
            output[i]['rataRataKelas'] = +grades.gradeEleven.score.toFixed(2);
            break;
          case 12:
            output[i]['rataRataKelas'] = +grades.gradeTwelve.score.toFixed(2);
            break;
          default:
            break;
        }
        if (output[i].nilaiRataRata < output[i].rataRataKelas) {
          output[i].status = 'Nilai dibawah rata-rata kelas!';
          switch (output[i].grade) {
            case 1:
              grades.gradeOne.underAverage.push({ name: output[i].name, score: output[i].nilaiRataRata });
              break;
            case 2:
              grades.gradeTwo.underAverage.push({ name: output[i].name, score: output[i].nilaiRataRata });
              break;
            case 3:
              grades.gradeThree.underAverage.push({ name: output[i].name, score: output[i].nilaiRataRata });
              break;
            case 4:
              grades.gradeFour.underAverage.push({ name: output[i].name, score: output[i].nilaiRataRata });
              break;
            case 5:
              grades.gradeFive.underAverage.push({ name: output[i].name, score: output[i].nilaiRataRata });
              break;
            case 6:
              grades.gradeSix.underAverage.push({ name: output[i].name, score: output[i].nilaiRataRata });
              break;
            case 7:
              grades.gradeSeven.underAverage.push({ name: output[i].name, score: output[i].nilaiRataRata });
              break;
            case 8:
              grades.gradeEight.underAverage.push({ name: output[i].name, score: output[i].nilaiRataRata });
              break;
            case 9:
              grades.gradeNine.underAverage.push({ name: output[i].name, score: output[i].nilaiRataRata });
              break;
            case 10:
              grades.gradeTen.underAverage.push({ name: output[i].name, score: output[i].nilaiRataRata });
              break;
            case 11:
              grades.gradeEleven.underAverage.push({ name: output[i].name, score: output[i].nilaiRataRata });
              break;
            case 12:
              grades.gradeTwelve.underAverage.push({ name: output[i].name, score: output[i].nilaiRataRata });
              break;
            default:
              break;
          }
        } else if (output[i].nilaiRataRata >= output[i].rataRataKelas) {
          output[i].status = 'Anda Lulus!';
          switch (output[i].grade) {
            case 1:
              grades.gradeOne.topThree.push({ name: output[i].name, score: output[i].nilaiRataRata });
              break;
            case 2:
              grades.gradeTwo.topThree.push({ name: output[i].name, score: output[i].nilaiRataRata });
              break;
            case 3:
              grades.gradeThree.topThree.push({ name: output[i].name, score: output[i].nilaiRataRata });
              break;
            case 4:
              grades.gradeFour.topThree.push({ name: output[i].name, score: output[i].nilaiRataRata });
              break;
            case 5:
              grades.gradeFive.topThree.push({ name: output[i].name, score: output[i].nilaiRataRata });
              break;
            case 6:
              grades.gradeSix.topThree.push({ name: output[i].name, score: output[i].nilaiRataRata });
              break;
            case 7:
              grades.gradeSeven.topThree.push({ name: output[i].name, score: output[i].nilaiRataRata });
              break;
            case 8:
              grades.gradeEight.topThree.push({ name: output[i].name, score: output[i].nilaiRataRata });
              break;
            case 9:
              grades.gradeNine.topThree.push({ name: output[i].name, score: output[i].nilaiRataRata });
              break;
            case 10:
              grades.gradeTen.topThree.push({ name: output[i].name, score: output[i].nilaiRataRata });
              break;
            case 11:
              grades.gradeEleven.topThree.push({ name: output[i].name, score: output[i].nilaiRataRata });
              break;
            case 12:
              grades.gradeTwelve.topThree.push({ name: output[i].name, score: output[i].nilaiRataRata });
              break;
            default:
              break;
          }
        }
      }

      //mencari nilai 3 tertinggi dan list Terendah
      for (let i of output) {
        switch (i.grade) {
          case 1:
            i.topThree = grades.gradeOne.topThree
              .sort(function (a, b) {
                return a.score - b.score;
              })
              .slice(0, 3);
            i.rataRataTerendah = grades.gradeOne.underAverage;
            break;
          case 2:
            i.topThree = grades.gradeTwo.topThree
              .sort(function (a, b) {
                return a.score - b.score;
              })
              .slice(0, 3);
            i.rataRataTerendah = grades.gradeTwo.underAverage;
            break;
          case 3:
            i.topThree = grades.gradeThree.topThree
              .sort(function (a, b) {
                return a.score - b.score;
              })
              .slice(0, 3);
            i.rataRataTerendah = grades.gradeThree.underAverage;
            break;
          case 4:
            i.topThree = grades.gradeFour.topThree
              .sort(function (a, b) {
                return a.score - b.score;
              })
              .slice(0, 3);
            i.rataRataTerendah = grades.gradeFour.underAverage;
            break;
          case 5:
            i.topThree = grades.gradeFive.topThree
              .sort(function (a, b) {
                return a.score - b.score;
              })
              .slice(0, 3);
            i.rataRataTerendah = grades.gradeFive.underAverage;
            break;
          case 6:
            i.topThree = grades.gradeSix.topThree
              .sort(function (a, b) {
                return a.score - b.score;
              })
              .slice(0, 3);
            i.rataRataTerendah = grades.gradeSix.underAverage;
            break;
          case 7:
            i.topThree = grades.gradeSeven.topThree
              .sort(function (a, b) {
                return a.score - b.score;
              })
              .slice(0, 3);
            i.rataRataTerendah = grades.gradeSeven.underAverage;
            break;
          case 8:
            i.topThree = grades.gradeEight.topThree
              .sort(function (a, b) {
                return a.score - b.score;
              })
              .slice(0, 3);
            i.rataRataTerendah = grades.gradeEight.underAverage;
            break;
          case 9:
            i.topThree = grades.gradeNine.topThree
              .sort(function (a, b) {
                return a.score - b.score;
              })
              .slice(0, 3);
            i.rataRataTerendah = grades.gradeNine.underAverage;
            break;
          case 10:
            i.topThree = grades.gradeTen.topThree
              .sort(function (a, b) {
                return a.score - b.score;
              })
              .slice(0, 3);
            i.rataRataTerendah = grades.gradeTen.underAverage;
            break;
          case 11:
            i.topThree = grades.gradeEleven.topThree
              .sort(function (a, b) {
                return a.score - b.score;
              })
              .slice(0, 3);
            i.rataRataTerendah = grades.gradeEleven.underAverage;
            break;
          case 12:
            i.topThree = grades.gradeTwelve.topThree
              .sort(function (a, b) {
                return a.score - b.score;
              })
              .slice(0, 3);
            i.rataRataTerendah = grades.gradeTwelve.underAverage;
            break;
          default:
            break;
        }
      }
      if (findUser.role === Roles.STUDENT) {
        const returning = output.find((x) => x.name === findUser.username);
        return returning;
      }
      return output;
    } catch (error) {
      console.log(error);
      throw new FilterException(error);
    }
  }
}
