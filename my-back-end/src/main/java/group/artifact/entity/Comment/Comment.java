package group.artifact.entity.Comment;

import group.artifact.entity.Account.Account;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String content;
    private Long rate;
    @ManyToOne
    @JoinColumn(name = "accountId")
    private Account account;
    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL)
    private List<CommentFiles> commentFiles;
}
